package hu.bme.mit.smartmobility.gdgbmewebsite.Model;


//ROLES CAN BE ADJUSTED Based on THOUGHTS


public enum Role {
    /** Read-only access; default after first Google login. */
    VISITOR,

    /**
     * Full member access. Granted manually by an ADMIN after the user
     * has joined the official community page.
     */
    MEMBER,

    /** Chapter organiser – superuser of the platform. FULL CRUD RBAC */
    ADMIN
}
