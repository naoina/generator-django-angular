import contextlib
import time

from fabric.api import (
    env, run, task, cd, execute, shell_env, settings,
)
from fabric.contrib import django
from fabric.contrib.project import upload_project

import gunicorn


def deploy_settings(override_settings=None):
    override_settings = override_settings or {}
    env.hosts = override_settings.get('hosts', ['192.168.33.33'])
    env.user = override_settings.get('user', '<%= deployAccount %>')
    env.settings_env = override_settings.get('settings_env', 'staging')
    env.appname = '<%= appName %>'
    env.use_ssh_config = True
    env.path = '/home/%(user)s/apps/%(appname)s' % env
    env.python = '%(path)s/bin/python' % env
    env.repository = '.'
    env.distdir = 'dist'
    env.release = time.strftime('%Y%m%d%H%M%S')
    env.releases_dir = '%(path)s/releases' % env
    env.release_path = '%(releases_dir)s/%(release)s' % env
    env.current_path = '%(path)s/current' % env
    env.shared_path = '%(path)s/shared' % env
    env.DJANGO_SETTINGS_MODULE = '%(appname)s.settings.%(settings_env)s' % env
    django.settings_module(env.DJANGO_SETTINGS_MODULE)


@task
def production():
    deploy_settings({
        'hosts': ['<%= deployHost %>'],
        'settings_env': 'production',
        })


@task
def staging():
    deploy_settings()


@task
def setup():
    """Initial setup
    """
    run('mkdir -p %(path)s' % env)
    run('virtualenv --no-site-packages --distribute -p python2 %(path)s' % env)
    run('mkdir -p %(releases_dir)s %(shared_path)s' % env)
    with cd(env.shared_path):
        run('mkdir -p uploads log' % env)
    upload_repo()
    install_requirements()
    execute(collectstatic)
    migrate()
    symlink_current_release()
    execute(start)


def install_requirements():
    run('%(path)s/bin/pip install -r %(release_path)s/requirements.txt' % env)


def upload_repo():
    upload_project(local_dir='./%(distdir)s/' % env,
                   remote_dir='%(releases_dir)s/' % env)
    run('mv %(releases_dir)s/%(distdir)s %(release_path)s' % env)
    symlink_release()


def symlink_release():
    run('rm -f %(release_path)s/public/uploads' % env)
    run('mkdir -p %(release_path)s/public' % env)
    run('ln -s %(shared_path)s/uploads %(release_path)s/public/uploads' % env)
    run('rm -rf %(release_path)s/log' % env)
    run('ln -s %(shared_path)s/log %(release_path)s/log' % env)


def symlink_current_release():
    with contextlib.nested(
            cd(env.path),
            settings(warn_only=True)):
        if run('test -L %(current_path)s' % env).succeeded:
            run('rm -f previous && mv %(current_path)s previous' % env)
        run('ln -s %(release_path)s %(current_path)s' % env)


def migrate():
    """Migrate the DB
    """
    with contextlib.nested(
            cd(env.release_path),
            shell_env(DJANGO_SETTINGS_MODULE=env.DJANGO_SETTINGS_MODULE)):
        run('%(python)s manage.py syncdb --migrate' % env)


def collectstatic():
    """Collect the static files
    """
    with contextlib.nested(
            cd(env.release_path),
            shell_env(DJANGO_SETTINGS_MODULE=env.DJANGO_SETTINGS_MODULE)):
        run('%(python)s manage.py assets --parse-templates build' % env)
        run('%(python)s manage.py collectstatic --noinput' % env)


@task
def deploy():
    """Deploy
    """
    try:
        upload_repo()
        install_requirements()
        execute(collectstatic)
        migrate()
        symlink_current_release()
        execute(restart)
    except Exception:
        execute(rollback)
        raise


@task
def rollback():
    """Rollback to previous deployment
    """
    with cd(env.path):
        run('rm -f current && mv previous current')
    execute(restart)


@task
def start():
    """Start servers
    """
    execute(gunicorn.start)


@task
def stop():
    """Stop servers
    """
    execute(gunicorn.stop)


@task
def restart():
    """Restart servers
    """
    execute(gunicorn.restart)
