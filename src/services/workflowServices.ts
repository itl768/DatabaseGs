// import type { PayGradeTableParams } from '@/pages/EmployeeFeild/sub_pages/PayGrade/data.d';


/**
 * To get all PayGrades
 */

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
try {
  let res = await fetch(request);
  return await res.json();
} catch (error) {
  console.log(error);
}

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
try {
let res = await fetch(request);
return await res.json();
} catch (error) {
console.log(error);
}



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
  try {
  let res = await fetch(request);
  return await res.json();
  } catch (error) {
  console.log(error);
  }
  

}

export async function removeData( key) {
  const request = new Request(`http://localhost:8080/api/deleteusers/${key}`, {
    method: "DELETE",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
   
  });
  try {
  let res = await fetch(request);
  return await res.json();
  } catch (error) {
  console.log(error);
  }
  
}

