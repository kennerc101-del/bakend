import jwt from "jsonwebtoken";

export function generateToken(user) {
    const token = jwt.sign({
        data: { username: user.username, role: user.role }
    }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });
    return token;
}

export function decodedToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

export function verifyToken(authorization, role) {
    try {
        if (!authorization) return false;
        const token = authorization.replace(/^Bearer\s+/i, '');
        const decoded = decodedToken(token);
        return role.includes(decoded.data.role);
    } catch (error) {
        return false;
    }
}