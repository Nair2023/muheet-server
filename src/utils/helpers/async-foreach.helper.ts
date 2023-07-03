/**
 *  A function that allows asynchronous looping on an array of items
 * @param array array input
 * @param callback callback input
 * @param next nest input
 */
export async function asyncForEach(
  array: Array<unknown>,
  callback: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    item: any,
    index: number,
    array: Array<unknown>,
  ) => Promise<unknown>,
  next?: (item: unknown) => void,
): Promise<void> {
  for (let index = 0; index < array.length; index++) {
    const returnValue = await callback(array[index], index, array);
    if (next) next(returnValue);
  }
}
