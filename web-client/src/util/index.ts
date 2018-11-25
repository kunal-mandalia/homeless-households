export function limitStringLength(input: string, chars: number): string {
  if (input.length > chars) {
    return `${input.substring(0, chars)}...`
  }
  return input;
}
