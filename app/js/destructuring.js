function test(){
    let [a,b,c] = [1,2,7];

    [a,b,c].map(function(i){
        console.log(i);
    });

    let [head, ...tail] = [1,2,3,4];

    console.log(tail);
}

function test2(){
    console.log('test2');
}

export {test , test2};

