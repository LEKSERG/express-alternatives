const Hapi = require('@hapi/hapi');
const db = require('../_db');

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  server.route(
    {
      method: 'POST',
      path: '/new',
      handler: async (request, h) => {
        const data = request.payload;

        await db.createDocument('notes', data);

        return h.response('ok').code(201);
      },
    },
    {
      method: 'PATCH',
      path: '/{noteId}',
      handler: async (request, h) => {
        const { noteId } = request.params;
        const data = request.payload;

        const note = await db.updateById('notes', noteId, data);

        return h.response(note).code(200);
      },
    },
    {
      method: 'GET',
      path: '/{noteId}',
      handler: async (request, h) => {
        const { noteId } = request.params;

        const note = await db.getDocumentById('notes', noteId);

        return h.response(note).code(200);
      },
    },
    {
      method: 'GET',
      path: '/all',
      handler: async (request, h) => {
        const notes = await db.getAllDocuments('notes');

        return h.response(notes).code(200);
      },
    }
  );

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
