import contextlib
import time

from fabric.api import task, run, cd, env, shell_env, execute


@task
def start():
    """Start gunicorn
    """
    with contextlib.nested(
            cd(env.current_path),
            shell_env(DJANGO_SETTINGS_MODULE=env.DJANGO_SETTINGS_MODULE)):
        run(('%(path)s/bin/gunicorn'
            ' --workers=`python -c "import multiprocessing; print(multiprocessing.cpu_count() * 2 + 1)"`'
            ' --worker-class="egg:meinheld#gunicorn_worker"'
            ' --max-requests=1000'
            ' --bind=127.0.0.1:8336'
            ' --user=%(user)s'
            ' --log-level=INFO'
            ' --error-logfile=%(current_path)s/log/gunicorn.log'
            ' --pid=%(shared_path)s/gunicorn.pid'
            ' --daemon'
            ' %(appname)s.wsgi:application') % env, pty=False)


@task
def stop():
    """Stop gunicorn
    """
    run('kill -TERM `cat %(shared_path)s/gunicorn.pid`' % env)


@task
def restart():
    """Graceful restart the gunicorn
    """
    execute(stop)
    time.sleep(1)
    execute(start)
