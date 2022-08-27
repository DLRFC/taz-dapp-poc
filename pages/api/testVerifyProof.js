export default function handler(req, res) {
    console.log("called")

    if(res.method === 'GET'){

        res.status(200).json("Hello World");

    } else if( req.method === 'POST'){
        //Need to read these data but they are giving back undefined
        const { externalNullifier , solidityProof , signal, nullifierHash } = req.body
        const test = req.body;
        const result = "test result"
        console.log(req.body)
        console.log(solidityProof);
        console.log(externalNullifier);
        console.log(signal);
        console.log(nullifierHash);
        console.log(JSON.stringify(test));

        res.status(201).json(nullifierHash)
    }
    
}