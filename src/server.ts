import fastifyCors from "@fastify/cors";
import fastify from "fastify";
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from "fastify-type-provider-zod";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.register(fastifyCors, {
  origin: 'http://localhost:8888',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running on http://localhost:3333");
})