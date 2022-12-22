export function asPolicyRegex(policy) {
  return new RegExp(`^${policy}$`);
}

export function isPolicyAuthorized(policy, action, resource) {
  return asPolicyRegex(policy.action).test(action) && asPolicyRegex(policy.resource).test(resource);
}

export function requiresRouteAccessPolicy(action) {
  return (request, response, next) => {
    const resource = request.baseUrl + request.path;
    const isAuthorized = (policy) => isPolicyAuthorized(policy, action, resource);
    return request.user?.rolePolicies?.some(isAuthorized)
      ? next()
      : response.status(403).json({ message: "Forbidden" });
  };
}
