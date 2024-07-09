const DEFAULT_PORT = 3000;
const getHostPortServerSide = () => `${process.env.HOST}:${process.env.PORT || DEFAULT_PORT}`;
const getHostPortBrowserSide = () => '';

export function getHostPort(){
    if(typeof window !== 'undefined') return getHostPortBrowserSide();
    return getHostPortServerSide();
}
