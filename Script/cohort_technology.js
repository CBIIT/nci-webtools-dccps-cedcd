insert into cohort_technology (
	cohort_id,
	tech_use_of_mobile,
	tech_use_of_mobile_describe,
	tech_use_of_cloud,
	tech_use_of_cloud_describe
)
select cohort_id,
	(case when tech_use_of_mobile = "No" then 0
	        when tech_use_of_mobile = "Yes" then 1
	        else -1
	   end
	  ),
	tech_use_of_mobile_describe,
	(case when tech_use_of_cloud = "No" then 0
        when tech_use_of_cloud = "Yes" then 1
        else -1
	   end
	  ),
	tech_use_of_cloud_describe
from cohort_data