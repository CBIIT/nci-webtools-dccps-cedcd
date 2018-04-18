insert into cohort_technology (
	cohort_id,
	tech_use_of_mobile,
	tech_use_of_mobile_describe,
	tech_use_of_cloud,
	tech_use_of_cloud_describe
)
select cohort_id,
	(case when tech_use_of_mobile = "Yes" then 0
	        when tech_use_of_mobile = "No, Considering" then 1
	        when tech_use_of_mobile = "No Plans" then 2
	        else -1
	   end
	  ),
	tech_use_of_mobile_describe,
	(case when tech_use_of_cloud = "Yes" then 0
        when tech_use_of_cloud = "No, Considering" then 1
        when tech_use_of_cloud = "No Plans" then 2
        else -1
	   end
	  ),
	tech_use_of_cloud_describe
from cohort_data