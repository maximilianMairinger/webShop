export default function delay(ms: number): Promise<object>{
    var ctr, rej, p = new Promise(function (resolve, reject) {
        ctr = setTimeout(resolve, ms);
        rej = reject;
    });
    //@ts-ignore
    p.cancel = function(){ clearTimeout(ctr); rej(Error("Cancelled"))};
    return p;
}
