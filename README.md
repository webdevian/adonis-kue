# Adonis Kue Provider

A [Kue](https://github.com/Automattic/kue) provider for the Adonis framework.

This library provides an easy way to get started with an asynchronous job queue for AdonisJS.

## Install

```
npm install --save adonis-kue
```

## Configure

Register the kue provider in `start/app.js`:

```javascript
const providers = [
  ...
  'adonis-kue/providers/KueProvider'
]
```

Register the commands provider:

```javascript
const aceProviders = [
  ...
  'adonis-kue/providers/CommandsProvider'
];
```

Add a configuration file in `config/kue.js`. For example:

```javascript
'use strict';

const Env = use('Env');

module.exports = {
  prefix: 'q',
  redis: Env.get('REDIS_URL')
};

```

See the [Kue Documentation](https://github.com/Automattic/kue#redis-connection-settings) for more connection options.

## Usage

### Starting the listener

Starting an instance of the kue listener is easy with the included ace command. Simply run `./ace kue:listen`.

The provider looks for jobs in the `app/Jobs` directory of your AdonisJS project and will automatically register a handler for any jobs that it finds.

### Creating your first job

Jobs are easy to create. They live in `app/Jobs` and they are a simple class. They expose the following properties:

| Name        | Required | Type      | Static | Description                                           |
|-------------|----------|-----------|--------|-----------------------------------------------|
| concurrency | false    | number    | true   | The number of concurrent jobs the handler will accept |
| key         | true     | string    | true   | A unique key for this job                             |
| handle      | true     | function  | false  | A function that is called for this job.               |

[Here's an example.](examples/app/Jobs/Example.js)

### Dispatching jobs

Now that your job listener is running and ready to do some asynchronous work, you can start dispatching jobs. 

```javascript
const kue = use('Kue');
const Job = require('./app/Jobs/Example');
const data = { test: 'data' }; // Data to be passed to job handle
const priority = 'normal'; // Priority of job, can be low, normal, medium, high or critical
const attempts = 1; // Number of times to attempt job if it fails
const remove = true; // Should jobs be automatically removed on completion
const job = kue.dispatch(Job.key, data, priority, attempts, remove);

// If you want to wait on the result, you can do this
const result = yield job.result;
```

## Thanks

Special thanks to the creator(s) of [AdonisJS](http://adonisjs.com/) for creating such a great framework.
