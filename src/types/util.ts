/** Keys of T whose value type is string, number, or boolean (including optional) */
export type PrimitiveKeys<T> = {
  [K in keyof T]: T[K] extends string | number | boolean | Date | null | undefined ? K : never
}[keyof T]
