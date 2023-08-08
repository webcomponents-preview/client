/**
 * Adds a simple `it.each` function to the global scope.
 */
it.each = ([header], ...values) => {
  // read header from table
  const headers = header.split('|').map((h) => h.trim());
  const rows = [];

  // gather data from table
  for (let i = 0; i < values.length; i += headers.length) {
    const row = values.slice(i, i + headers.length);
    const params = {};
    for (let j = 0; j < headers.length; j++) {
      params[headers[j]] = row[j];
    }
    rows.push(params);
  }

  // provide the test function with the data
  return (title, fn) => {
    for (const row of rows) {
      // prepare the title
      const rowTitle = title.replace(/\$(\w+)/g, (_, key) => row[key.trim()] ?? _);
      // call the test function
      it(rowTitle, (done) => {
        // call the given test function with the row data
        const result = fn.call(this, row, done);
        // do we have a promise?
        if (result && result.then) {
          result.then(done).catch(done);
        }
        // just call it synchronously
        else done(result);
      });
    }
  };
};
