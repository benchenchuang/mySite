const Koa = require('koa')
const app = new Koa()
const ejs=require('ejs');
const views = require('koa-views')
const json = require('koa-json')
const session=require('koa-session');
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')

app.keys=['me session'];
const setConfig={
  key:'token',
  maxAge:18300000,
  overwrite: true, 
  httpOnly: true,
  signed: true, 
  rolling: false,
}

app.use(session(setConfig,app));
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
