-- -----------------------------------------------------------------------------------------------------------
-- === revised according to questionnarire v8 in 2020 =====
-- === mysql v 8.0 =====
/* 
 *  CREATE Views:
 * 1. v_lu_domian (list top level category for dropdown list)
 *
 */
-- -----------------------------------------------------------------------------------------------------------

DROP VIEW IF EXISTS `cohort_summary` ;

-- -----------------------------------------------------------------------------------------------------------
-- View: v_lu_data_collected_category
-- -----------------------------------------------------------------------------------------------------------
DROP VIEW IF EXISTS `v_lu_data_collected_category` ;

CREATE VIEW v_lu_data_collected_category AS
 select min(id) as id , category from lu_data_collected_category group by category order by id;


-- ======== end View script ===============