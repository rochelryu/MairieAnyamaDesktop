import axios from 'axios';
const uriLocal = "http://93.104.213.181:8090/ryu/";
export const uriFront = "http://93.104.213.181:3000/ryu/";


export const all = (token)=>{
    return new Promise(next=>{
        fetch(`${uriLocal}${token}`)
            .then((response) => response.json())
            .then((responseJson) => {
                next(responseJson.info)
            })
            .catch((error) =>{
                console.error("ici de ",error);
                next(error)
            });
    })
}


export const etablissement = (token)=>{
    return new Promise(next=>{
        fetch(`${uriLocal}etablissements/${token}`)
            .then((response) => response.json())
            .then((responseJson) => {
                next(responseJson.etablissement)
            })
            .catch((error) =>{
                console.error("ici de ",error);
                next(error)
            });
    });
}
export const naissance = (token)=>{
    return new Promise(next=>{
        fetch(`${uriLocal}naissance/${token}`)
            .then((response) => response.json())
            .then((responseJson) => {
                next(responseJson.naiss)
            })
            .catch((error) =>{
                console.error("ici de ",error);
                next(error)
            });
    });
}
export const setEtablissement = (name,tokent) => {
    const ele = {
        name: name,
        tt: tokent
    };
    return new Promise(async next=>{
        await axios.post(`${uriLocal}etabliss`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                console.log("err \n" +err)
                next(err)
            })
    });
}

export const viewExtrait = (tokent,id) => {
    const ele = {
        ite: id,
        tt: tokent
    };
    return new Promise(async next=>{
        await axios.post(`${uriLocal}extrait`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                console.log("err \n" +err)
                next(err)
            })
    });
}

export const setNaissance = (item,tokent) => {
    const ele = {
        item: item,
        tt: tokent
    };
    return new Promise(async next=>{
        await axios.post(`${uriLocal}naissance`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                console.log("err \n" +err)
                next(err)
            })
    });
}


export const login = (email,password) => {
    const ele = {
        name: email,
        password: password
    };
    return new Promise(async next=>{
        await axios.post(`${uriLocal}login`, ele )
            .then((res) => {
                next(res.data)
            }).catch((err)=>{
                console.log("err \n" +err)
                next(err)
            })
    })
}
