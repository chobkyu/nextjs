export async function checkUser(id:number, group:number) {
    const userId = id;
    const groupId = group
    const qryStr = `
        select id
        from groupMem
        where
        userId = ${id}
        and 
        groupId = ${group}
        and follow true
    `

    try{
        const res = await connection.query(qryStr);

        if(res.length>0){
            return {success:true};
        }else{
            return {success:false,msg:'등록 되지 않은 유저입니다'};
        }

    }catch(err){
        console.log(err);
        return {success:false};
    }
}