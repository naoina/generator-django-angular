# Django with AngularJS generator [![Build Status](https://secure.travis-ci.org/naoina/generator-django-angular.png?branch=master)](https://travis-ci.org/naoina/generator-django-angular)

## Getting started

Make sure you have [yo](https://github.com/yeoman/yo) installed:
```
npm install -g yo
```
Install the generator:
```
npm install -g "git+https://github.com/naoina/generator-django-angular"
```
Run: `yo django-angular`
```
yo django-angular
```

## Generators

Available generators are following:

* [django-angular](#app) (aka [django-angular:app](#app))
* [django-angular:controller](#controller)
* [django-angular:directive](#directive)
* [django-angular:filter](#filter)
* [django-angular:service](#service)
* [django-angular:factory](#factory)
* [django-angular:provider](#provider)

### App

Setup new Django project and AngularJS.

```
yo django-angular
```

### Controller

Generates a controller, and add dependency to `:appName/static/js/controllers/all.js`.

```
yo django-angular:controller user
```

Produces `:appName/static/js/controllers/user.js`:

### Directive

Generates a directive, and add dependency to `:appName/static/js/directives/all.js`.

```
yo django-angular:directive my_directive
```

Produces `:appName/static/js/directives/my_directive.js`

### Filter

Generates a filter, and add dependency to `:appName/static/js/filters/all.js`.

```
yo django-angular:filter my_filter
```

Produces `:appName/static/js/filters/my_filter.js`

### Service

Generates a service, and add dependency to `:appName/static/js/services/all.js`.

```
yo django-angular:service my_service
```

Produces `:appName/static/js/services/my_service.js

#### Factory

Generates a factory, and add dependency to `:appName/static/js/services/all.js`.

```
yo django-angular:factory my_factory
```

Produces `:appName/static/js/services/my_factory.js

#### Provider

Generates a provider, and add dependency to `:appName/static/js/services/all.js`.

```
yo django-angular:provider my_provider
```

Produces `:appName/static/js/services/my_provider.js

## License
[NYSL](http://www.kmonos.net/nysl/index.en.html)
