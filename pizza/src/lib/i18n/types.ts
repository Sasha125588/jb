type UnionToIntersection<Union> = (Union extends unknown ? (value: Union) => void : never) extends (
  value: infer Intersection
) => void
  ? Intersection
  : never

type NestedKey<Key extends string, Value> = Key extends `${infer Head}.${infer Tail}`
  ? { [Current in Head]: NestedKey<Tail, Value> }
  : { [Current in Key]: Value }

export type UnflattenMessages<Flat extends Record<string, unknown>> = UnionToIntersection<
  {
    [Key in keyof Flat & string]: NestedKey<Key, Flat[Key]>
  }[keyof Flat & string]
>
