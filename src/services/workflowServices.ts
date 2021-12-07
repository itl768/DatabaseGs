// import type { PayGradeTableParams } from '@/pages/EmployeeFeild/sub_pages/PayGrade/data.d';



export async function queryData( params: any) {
  console.log(params)

  const request = new Request("http://localhost:8080/api/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    body:JSON.stringify(params)
});
let res = await fetch(request);
  if(!res.ok){
    return false
    }
    return await res.json();
  
  
}




export async function addData(type: string, params: any) {
console.log(params)
params["id"]=null;
const request = new Request("http://localhost:8080/api/addusers", {
  method: "POST",
  headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
  },
  body:JSON.stringify(params)
});

let res = await fetch(request);
if(!res.ok){
return false
}
return await res.json();


}

export async function updateData(type: string, params: any) {
  const request = new Request("http://localhost:8080/api/updateusers", {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    },
    body:JSON.stringify(params)
  });
  
  let res = await fetch(request);
  if(!res.ok){
    return false
    }
    return await res.json();
    
    

}

export async function removeData( key) {
  const request = new Request(`http://localhost:8080/api/deleteusers/${key}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
   
  });

  let res = await fetch(request);
  if(!res.ok){
    return false
    }
    return await res.json();
    
    
  
}

