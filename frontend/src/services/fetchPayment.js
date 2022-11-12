const urlBase = 'http://localhost:8080';

export const paymentApi = async item => {
  try {
    const res = await fetch(`${urlBase}/purchase/create-checkout-session`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });

    return await res.json();
  } catch (err) {
    console.error(err);
  }
};
