export const handleRoleAccess = accessPolicies => (req, res, next) => {
    if (accessPolicies[0] === 'PUBLIC') 
    return next();

  if (!req.session || !req.session.user) {
    return res.status(401).json({ status: 'error', error: 'User not authenticated.' });
  }

  const CurrentUser = req.session.user;

  if (!accessPolicies.includes(CurrentUser.role.toUpperCase())) {
    return res.status(403).json({ status: 'error', error: 'User without permissions' });
  }
    next()
}