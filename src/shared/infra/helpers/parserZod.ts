import { z } from 'zod';

type Schema = z.ZodObject<any, any>;
type ParserOutput = boolean | z.ZodError<any> | z.ZodIssue[];

function validaDataWhitSchemaZod(schema: Schema, data: any): ParserOutput {
  try {
    schema.parse(data);
    return true;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors;
    }
    // Return false for unexpected errors
    return false;
  }
}

export default validaDataWhitSchemaZod;
