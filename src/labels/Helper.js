/**
 * Calculated the placement of the pictograms and there ideal size
 *
 * @author https://math.stackexchange.com/questions/466198/algorithm-to-get-the-maximum-size-of-n-squares-that-fit-into-a-rectangle-with-a/466248
 *
 * @param {int} x dimmension of the cell where the picotgrams are to be displayed
 * @param {int} y dimmension of the cell where the pictograms are to be displayed
 * @param {int} n number of pictograms to be displayed
 * @returns Array containing [number of row, number of collums, pictogram size]
 */
function calculatePictoSize(x, y, n) {
  // Compute number of rows and columns, and cell size
  var ratio = x / y;
  var ncols_float = Math.sqrt(n * ratio);
  var nrows_float = n / ncols_float;

  // Find best option filling the whole height
  var nrows1 = Math.ceil(nrows_float);
  var ncols1 = Math.ceil(n / nrows1);
  while (nrows1 * ratio < ncols1) {
    nrows1++;
    ncols1 = Math.ceil(n / nrows1);
  }
  var cell_size1 = y / nrows1;

  // Find best option filling the whole width
  var ncols2 = Math.ceil(ncols_float);
  var nrows2 = Math.ceil(n / ncols2);
  while (ncols2 < nrows2 * ratio) {
    ncols2++;
    nrows2 = Math.ceil(n / ncols2);
  }
  var cell_size2 = x / ncols2;

  // Find the best values
  var nrows, ncols, cell_size;
  if (cell_size1 < cell_size2) {
    nrows = nrows2;
    ncols = ncols2;
    cell_size = cell_size2;
  } else {
    nrows = nrows1;
    ncols = ncols1;
    cell_size = cell_size1;
  }
  return [nrows, ncols, cell_size];
}

export default calculatePictoSize;
