export default function itIsTypeofThatInterface<T>(it: any, propertyOfInterface: string): it is T {
  return (it as T)[propertyOfInterface as keyof T] !== undefined;
}
