import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod"
import { z } from 'zod';
import { db } from "../../db/connection.ts"
import { schema } from "../../db/schema/index.ts"

export const createRoomRoute: FastifyPluginCallbackZod = (app) => {
  app.post('/rooms', {
    schema: {
      body: z.object({
        name: z.string().min(1),
        description: z.string().optional(),
      })
    },
  },
  async (request, reply) => {
    const { name, description } = request.body as { name: string; description?: string };

    // Por padrão o postgres não retorna o registro inserido, então usamos o método `returning` para obter os dados do novo registro
    const result = await db.insert(schema.rooms).values({ name, description }).returning();

    const insertedRoom = result[0];

    if (!insertedRoom) {
      throw new Error('Failed to create new room');
    }

    return reply.status(201).send({
      roomId: insertedRoom.id
    })
  });
}
