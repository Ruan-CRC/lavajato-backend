import { Request } from 'express';
import { z } from 'zod';

type Schema = z.ZodObject<any, any>;
type ParserOutput = boolean | z.ZodError<any> | z.ZodIssue[];

function safeParseSchemaModel(schema: Schema, data: Request): ParserOutput {
  const { error } = schema.safeParse(data);
  if (error) {
    return error.errors;
  }
  return true;
}

export default safeParseSchemaModel;
