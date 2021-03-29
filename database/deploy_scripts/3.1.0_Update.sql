/*
* this script file includes DB updates during CEDCD release 3.1.0
*
* !!!! consider these sqls could be repeated for each deploy !!!!
*  any table structures changes need update accordingly in Schema/cedec_Tables.sql file
*
*/

use cedcd;
-- -----------------------------------------------------------------------------------------------------------
-- View: v_lu_collected_specimen
-- -----------------------------------------------------------------------------------------------------------

CREATE OR REPLACE VIEW v_lu_collected_specimen AS
    SELECT 
        MIN(lu_specimen.id) AS id, lu_specimen.specimen AS specimen
    FROM lu_specimen
    WHERE sub_category IS NOT NULL
        AND specimen IN ('Blood' , 'Buccal/Saliva',
            'Tissue (includes tumor and/or normal)',
            'Urine', 'Feces','Other')
    GROUP BY specimen
    ORDER BY id;


