'use strict';

const Router = require('koa-router');
const store = require('./store');
const { validate } = require('./utils/validator');

const router = new Router();

router.get('/', ctx => {
    ctx.body = 'Hello World';
});
router.get('/dogs', ctx => {
    ctx.body = store.readAll();
});
router.get('/dogs/:id', ctx => {
    const dog = store.read(Number(ctx.params.id));

    if (!dog) {
        ctx.status = 404;
        return;
    }

    ctx.body = dog;
});
router.post('/dogs', ctx => {
    const schema = {
        type: 'Object',
        required: true,
        properties: {
            id: {
                type: 'integer',
                required: false,
            },
            name: {
                type: 'string',
                required: true,
            },
            breed: {
                type: 'string',
                required: true,
            },
            birthYear: {
                type: 'number',
            },
            photo: {
                type: 'string',
                format: 'url',
            },
        },
    };
    const validation = validate(ctx.request.body, schema);

    if (!validation.valid) {
        ctx.status = 400;
        ctx.body = {
            errors: validation.errors,
        };
        return;
    }

    const dog = store.create(ctx.request.body);

    ctx.body = dog;
});
router.patch('/dogs/:id', ctx => {
    const schema = {
        type: 'Object',
        required: true,
        properties: {
            name: {
                type: 'string',
            },
            breed: {
                type: 'string',
            },
            birthYear: {
                type: 'number',
            },
            photo: {
                type: 'string',
                format: 'url',
            },
        },
    };
    const validation = validate(ctx.request.body, schema);

    if (!validation.valid) {
        ctx.status = 400;
        ctx.body = {
            errors: validation.errors,
        };
        return;
    }

    const dog = store.update({ ...ctx.request.body, id: Number(ctx.params.id) });

    if (dog === false) {
        ctx.status = 404;
        return;
    }

    ctx.body = dog;
});
router.delete('/dogs/:id', ctx => {
    const result = store.delete(Number(ctx.params.id));

    if (result === false) {
        ctx.status = 404;
        return;
    }

    ctx.status = 200;
});

module.exports = router.routes();
