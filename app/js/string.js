function s1(){

    let string1 = 'x'.repeat(3);

    console.log(string1);
}

function template(s){
    let sobject = {
        firstname: 'hello',
        secondname: 'world2'
    }

    let mount = document.querySelector(s);

    mount.innerHTML = mount.innerHTML + `<p>${sobject.firstname},${sobject.secondname}</p>`;
}


function template2(){

    let total = 30;
    let msg = passthru`The total is ${total} (${total*1.05} with tax)`;

    function passthru(literals) {

      console.log(literals);
      console.log(arguments);
      
      var result = "";
      var i = 0;

      while (i < literals.length) {
        result += literals[i++];
        
        if (i < arguments.length) {
          result += arguments[i];  // 这里已经开始从argument[1] 走起了
        }
      }

      return result;

    }

    console.log(msg);
}

export { s1 , template, template2};
