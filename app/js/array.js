let elearr = [...document.querySelectorAll('div')];

// eles to array ,then we could use for each , console.log(elearr);

function arrayFrom(){
   let result = Array.from([1,2,3] , (x) => x * x);

   return result;
}

console.log(arrayFrom());

export { elearr };
