const Koa = require('koa');
const KoaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');
const db = require('../_db');

const app = new Koa();
const router = new KoaRouter();

app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

router.get('/all', async (ctx) => {
  const notes = await db.getAllDocuments('notes');
  ctx.body = { notes };
});

router.post('/new', async (ctx) => {
  const data = ctx.request.body;
  await db.createDocument('notes', data);

  ctx.status(201);
});

router.patch('/:noteId', async (ctx) => {
  const { noteId } = ctx.params;
  const data = ctx.request.body;
  const note = await db.updateById('notes', noteId, data);

  ctx.body = { note };
});

router.get('/:noteId', async (ctx) => {
  const { noteId } = ctx.params;
  const note = await db.getDocumentById('notes', noteId);

  ctx.body = { note };
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
