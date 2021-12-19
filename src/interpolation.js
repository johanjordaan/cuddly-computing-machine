const linear = (a, b, n) => {
    let state = {a, b, n, delta:(b-a)/n, i:0}
    return {
        "hasNext": () => {
            return state.i<=n;
        },
        "next": () => {
            state.i += 1;
            return a+state.delta*state.i;
        },
        "reset": () => {
            state.i = 0
        }
    }
}

const stacked_linear = (abn_array) => {
    let fs = []
    let fi = 0;
    abn_array.forEach(([a, b, n]) => {
        fs.push(linear(a, b, n))
    })

    return {
        "hasNext": () => {
            if (fs[fi].hasNext()) return true;
            fi += 1
            if (fi >= fs.length) {
                return false;
            } else {
                return fs[fi].hasNext();
            }
        },
        "next": () => {
            return fs[fi].next();
        },
        "reset": () => {
            fs.forEach((f) => {
                f.reset();
                fi = 0;
            })
        }
    }
}

const project = (a,b,da,db) => {
    const source_delta = b - a
    const dest_delta = db - da

    return {
        "hasNext": () => {
            return true
        },
        "next": (v) => {
            const perc = v/source_delta
            return da+(dest_delta*perc)
        },
        "reset": () => {
        }
    }
}




const interpolation = {
    "linear": linear,
    "stacked_linear": stacked_linear,
    "project" : project,
}
