insert into cohort_dlh (
	cohort_id,
	dlh_linked_to_existing_databases,
	dlh_linked_to_existing_databases_specify,
	dlh_harmonization_projects,
	dlh_harmonization_projects_specify,
	dlh_nih_repository,
	dlh_nih_cedr,
	dlh_nih_dbgap,
	dlh_nih_biolincc,
	dlh_nih_other
)
select cohort_id,
	(case when dlh_linked_to_existing_databases = "No" then 0
	        when dlh_linked_to_existing_databases = "Yes" then 1
	        else -1
	   end
	  ),
	dlh_linked_to_existing_databases_specify,
	(case when dlh_harmonization_projects = "No" then 0
	    when dlh_harmonization_projects = "Yes" then 1
	    else -1
	end
	),
	dlh_harmonization_projects_specify,
	(case when dlh_nih_repository = "No" then 0
        when dlh_nih_repository = "Yes" then 1
        else -1
   end
  ),
	(case when dlh_nih_cedr = "No" then 0
        when dlh_nih_cedr = "Yes" then 1
        else -1
   end
  ),
	(case when dlh_nih_dbgap = "No" then 0
        when dlh_nih_dbgap = "Yes" then 1
        else -1
   end
  ),
	(case when dlh_nih_biolincc = "No" then 0
        when dlh_nih_biolincc = "Yes" then 1
        else -1
   end
  ),
	(case when dlh_nih_other = "No" then 0
        when dlh_nih_other = "Yes" then 1
        else -1
   end
  )
	
from cohort_data