export function accountLogged(req,res,next){
    if(req.session?.user?.email || req.session?.user?.role == "admin"){
        return next();
    }
    return res.status(401).render('error', {
        error: 'error de autenticación!!'
    });
}

export function isAdmin(req,res,next){
    if (req.session?.user?.role == "admin"){
        return next();
    }
    return res.status(403).render('error', {
        error: 'error de autorización!!'
    });
}