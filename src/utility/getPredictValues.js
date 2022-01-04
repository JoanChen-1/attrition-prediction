const base_url = 'http://localhost:5000'
// async function getResult (){
//     return {
//         "message": "Success",
//         "result": {
//             "probs": [
//                 {'user_id':442, 'Attrition': 76},
//                 {'user_id':443, 'Attrition': 20},
//                 {'user_id':444, 'Attrition': 55}
//             ],
//             "img": ""
//          }
//     }
// }

export const getPredictValues = async(data, params) => {
    // console.log(data);
    // const result = await getResult();
    // return [result.result.probs, ""];
    try{
        const endpoint = `${base_url}/predict/${params}`;
        const bodyData = JSON.stringify({ "data": data });
        const response = await fetch(endpoint, {
            method: "POST",
            body: bodyData,
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json",
            }
        });
    
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.message === "Success"){
                if (params === "nonplot"){
                    return jsonResponse.result.probs;//return probs only
                }
                else{//return both probs and img
                    return [jsonResponse.result.probs, jsonResponse.result.img];
                }
            }
            else{
                alert(jsonResponse.message);
                return "fail";
            }
        }
        else{
            // alert(response.status + " " + response.statusText);
            return "fail";
        }
    }
    catch(e){
        return "fail";
    }
}