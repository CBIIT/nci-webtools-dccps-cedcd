-- -----------------------------------------------------------------------------------------------------------
-- === revised according to questionnarire v8 in 2020 =====
-- === mysql v 8.0 =====
/* 
 *  CREATE Views:
 * 1. v_lu_domian (list top level domain for dropdown list)
 *
 */
-- -----------------------------------------------------------------------------------------------------------

DROP VIEW IF EXISTS `cohort_summary` ;

-- -----------------------------------------------------------------------------------------------------------
-- View: v_lu_domain
-- -----------------------------------------------------------------------------------------------------------
DROP VIEW IF EXISTS `v_lu_domain` ;

CREATE VIEW v_lu_domain AS
 select min(id) as id , domain from lu_domain group by domain order by id;


-- ======== end View script ===============