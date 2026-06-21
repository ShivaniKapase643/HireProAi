/**
 * Role-Based Access Control (RBAC) Middleware
 * 
 * Implements hierarchical role checking with permission-based
 * access control for different platform features.
 */

/**
 * Role hierarchy (higher includes all permissions of lower roles)
 */
const ROLE_HIERARCHY = {
  admin: 5,
  tpo: 4,
  recruiter: 3,
  premium_student: 2,
  student: 1,
  guest: 0
};

/**
 * Feature-based permissions mapping
 * Maps roles to their allowed features/actions
 */
const ROLE_PERMISSIONS = {
  admin: [
    'manage_users', 'manage_content', 'manage_system', 'view_audit_logs',
    'manage_roles', 'manage_subscriptions', 'view_analytics', 'manage_companies',
    'manage_drives', 'system_settings', 'bulk_operations', 'export_data'
  ],
  tpo: [
    'view_students', 'manage_drives', 'view_analytics', 'manage_companies',
    'schedule_interviews', 'generate_reports', 'send_notifications',
    'manage_placements', 'view_student_progress', 'export_reports'
  ],
  recruiter: [
    'post_jobs', 'search_candidates', 'schedule_interviews', 'manage_applications',
    'view_resumes', 'send_offers', 'manage_company_profile', 'ats_screening',
    'view_candidate_analytics', 'export_candidates'
  ],
  premium_student: [
    'access_ai_interview', 'access_resume_analyzer', 'access_job_tracker',
    'access_career_recommendations', 'access_analytics', 'access_voice_module',
    'unlimited_ai_requests', 'priority_support', 'advanced_reports',
    'company_specific_prep', 'access_all_companies'
  ],
  student: [
    'access_ai_interview', 'access_resume_analyzer', 'access_job_tracker',
    'access_basic_analytics', 'access_notifications', 'manage_profile',
    'basic_career_recommendations', 'limited_ai_requests'
  ],
  guest: [
    'view_jobs', 'view_companies', 'register'
  ]
};

/**
 * Middleware: Restrict access to specific roles
 * @param  {...string} allowedRoles - Roles that can access the route
 * @returns {Function} Express middleware
 * 
 * Usage: router.get('/admin/users', protect, authorize('admin', 'tpo'), controller)
 */
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required to access this resource.'
      });
    }

    const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Role '${userRole}' is not authorized for this action.`,
        requiredRoles: allowedRoles
      });
    }

    next();
  };
};

/**
 * Middleware: Check specific permission
 * @param {string} permission - Required permission
 * @returns {Function} Express middleware
 * 
 * Usage: router.post('/jobs', protect, hasPermission('post_jobs'), controller)
 */
const hasPermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const userRole = req.user.role;
    const userPermissions = ROLE_PERMISSIONS[userRole] || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        message: `Insufficient permissions. '${permission}' access required.`,
        userRole,
        requiredPermission: permission
      });
    }

    next();
  };
};

/**
 * Middleware: Check minimum role level
 * @param {string} minRole - Minimum required role in hierarchy
 * @returns {Function} Express middleware
 */
const minRole = (minRole) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const userLevel = ROLE_HIERARCHY[req.user.role] || 0;
    const requiredLevel = ROLE_HIERARCHY[minRole] || 0;

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        message: `Minimum role '${minRole}' required for this action.`
      });
    }

    next();
  };
};

/**
 * Middleware: Resource ownership check
 * Ensures users can only access their own resources unless they're admin/TPO
 */
const ownerOrAdmin = (resourceUserIdField = 'userId') => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.'
      });
    }

    const isAdmin = ['admin', 'tpo'].includes(req.user.role);
    const resourceUserId = req.params[resourceUserIdField] || req.params.id;
    const isOwner = req.user._id.toString() === resourceUserId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own resources.'
      });
    }

    next();
  };
};

module.exports = {
  authorize,
  hasPermission,
  minRole,
  ownerOrAdmin,
  ROLE_HIERARCHY,
  ROLE_PERMISSIONS
};
