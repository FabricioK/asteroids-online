exports.canvas = {
    width: 600,
    height: 600,
    getContext: () => {
        return { clearRect: () => { } }
    }
}