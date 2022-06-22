const submitBtn = document.querySelector('.form');
submitBtn.addEventListener('submit', onPositionAmount);

function onPositionAmount(e) {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  let delay = formElements.delay.value;
  let step = formElements.step.value;
  let amount = formElements.amount.value;
  for (let position = 1; position <= amount; position++) {
    createPromise({ position, delay })
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.log(error);
      });
  }
  e.currentTarget.reset();
}

function createPromise({ position, delay }) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay} ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay} ms`);
      }
    }, delay);
  });
}
