export function accountLogged(req,res,next){
    if(req.session?.user){
        return next();
    }
    return res.status(401).render('error', {
        error: 'error de autenticación: STATUS 401!!'
    });
}

export async function isAdminOrPremium(req,res,next){
    await req.session.user;
    if (req.session?.user?.role == "admin" || req.session?.user?.role == "premium"){
        console.log("el user role es ", req.session.user.role)
        return next();
    }
    return res.status(403).render('error', {
        error: 'error de autorización: STATUS 403!!'
    });
}

export async function isUser(req,res,next){
    await req.session.user;
    if (req.session?.user?.role == "user"){
        console.log("el user role es ", req.session.user.role)
        return next();
    }
    return res.status(403).render('error', {
        error: 'error de autorización: STATUS 403!!'
    });
}

export function redirectToHomeIfUserLogged(req, res, next) {
    if (req.session.user) {
        // El usuario ya está autenticado, redirigir a la página de inicio o panel de control.
        return res.redirect('/home'); 
    } else {
        // Si el usuario no está autenticado, continúa con la ejecución normal.
        return next();
    }
}
