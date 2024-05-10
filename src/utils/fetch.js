const fetching = async (url, setter, requestData, handError) => {
  try {
    await (await fetch(url))
      .json()
      .then(
        (res) =>
          res.status === 200 && setter((antState) => requestData(antState, res))
      );
  } catch (error) {
    handError(error);
  }
};

export default fetching;
