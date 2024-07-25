import { Request } from 'express';
import { z } from 'zod';

type Schema = z.ZodObject<any, any>;
type ParserOutput = boolean | z.ZodError<any> | z.ZodIssue[];

function validaDataWhitSchemaZod(schema: Schema, data: Request): ParserOutput {
  const { error } = schema.parse(data);
  if (error) {
    return error.errors;
  }
  return true;
}

export default validaDataWhitSchemaZod;
