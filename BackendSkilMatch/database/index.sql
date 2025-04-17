-- SkillMatch AI Project SQL Procedures
-- Created: April 16, 2025

-- Enable UUID extension for PostgreSQL
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==================== USER MANAGEMENT ====================

-- Create a new user
CREATE OR REPLACE PROCEDURE create_user(
  p_email VARCHAR,
  p_password_hash VARCHAR,
  p_user_type VARCHAR,
  p_first_name VARCHAR DEFAULT NULL,
  p_last_name VARCHAR DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id UUID;
BEGIN
  -- Insert into users table
  INSERT INTO users (
    user_id, email, password_hash, user_type, created_at, last_login, account_status
  ) VALUES (
    uuid_generate_v4(), p_email, p_password_hash, p_user_type, NOW(), NULL, 'active'
  ) RETURNING user_id INTO v_user_id;
  
  -- Create profile record based on user type
  IF p_user_type = 'job_seeker' THEN
    INSERT INTO jobseekerprofiles (
      profile_id, user_id, first_name, last_name
    ) VALUES (
      uuid_generate_v4(), v_user_id, p_first_name, p_last_name
    );
  ELSIF p_user_type = 'employer' THEN
    INSERT INTO employerprofiles (
      profile_id, user_id
    ) VALUES (
      uuid_generate_v4(), v_user_id
    );
  END IF;
  
  COMMIT;
END;
$$;

-- Update user profile (job seeker)
CREATE OR REPLACE PROCEDURE update_jobseeker_profile(
  p_user_id UUID,
  p_first_name VARCHAR DEFAULT NULL,
  p_last_name VARCHAR DEFAULT NULL,
  p_headline VARCHAR DEFAULT NULL,
  p_about TEXT DEFAULT NULL,
  p_location VARCHAR DEFAULT NULL,
  p_contact_info VARCHAR DEFAULT NULL,
  p_profile_image_url VARCHAR DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE jobseekerprofiles
  SET 
    first_name = COALESCE(p_first_name, first_name),
    last_name = COALESCE(p_last_name, last_name),
    headline = COALESCE(p_headline, headline),
    about = COALESCE(p_about, about),
    location = COALESCE(p_location, location),
    contact_info = COALESCE(p_contact_info, contact_info),
    profile_image_url = COALESCE(p_profile_image_url, profile_image_url)
  WHERE user_id = p_user_id;
  
  COMMIT;
END;
$$;

-- Update user profile (employer)
CREATE OR REPLACE PROCEDURE update_employer_profile(
  p_user_id UUID,
  p_company_name VARCHAR DEFAULT NULL,
  p_industry VARCHAR DEFAULT NULL,
  p_company_size INTEGER DEFAULT NULL,
  p_description TEXT DEFAULT NULL,
  p_logo_url VARCHAR DEFAULT NULL,
  p_website VARCHAR DEFAULT NULL,
  p_location VARCHAR DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE employerprofiles
  SET 
    company_name = COALESCE(p_company_name, company_name),
    industry = COALESCE(p_industry, industry),
    company_size = COALESCE(p_company_size, company_size),
    description = COALESCE(p_description, description),
    logo_url = COALESCE(p_logo_url, logo_url),
    website = COALESCE(p_website, website),
    location = COALESCE(p_location, location)
  WHERE user_id = p_user_id;
  
  COMMIT;
END;
$$;

-- ==================== SKILL MANAGEMENT ====================

-- Add skill to user profile
CREATE OR REPLACE PROCEDURE add_user_skill(
  p_user_id UUID,
  p_skill_id UUID,
  p_proficiency_level INTEGER DEFAULT 1,
  p_years_experience INTEGER DEFAULT 0,
  p_verified BOOLEAN DEFAULT false
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO userskills (
    user_skill_id, user_id, skill_id, proficiency_level, years_experience, verified
  ) VALUES (
    uuid_generate_v4(), p_user_id, p_skill_id, p_proficiency_level, p_years_experience, p_verified
  );
  
  COMMIT;
END;
$$;

-- Update user skill
CREATE OR REPLACE PROCEDURE update_user_skill(
  p_user_skill_id UUID,
  p_proficiency_level INTEGER DEFAULT NULL,
  p_years_experience INTEGER DEFAULT NULL,
  p_verified BOOLEAN DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE userskills
  SET 
    proficiency_level = COALESCE(p_proficiency_level, proficiency_level),
    years_experience = COALESCE(p_years_experience, years_experience),
    verified = COALESCE(p_verified, verified)
  WHERE user_skill_id = p_user_skill_id;
  
  COMMIT;
END;
$$;

-- Create new skill
CREATE OR REPLACE PROCEDURE create_skill(
  p_name VARCHAR,
  p_category VARCHAR,
  p_description TEXT DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO skills (
    skill_id, name, category, description
  ) VALUES (
    uuid_generate_v4(), p_name, p_category, p_description
  );
  
  COMMIT;
END;
$$;

-- ==================== PORTFOLIO MANAGEMENT ====================

-- Create portfolio item
CREATE OR REPLACE PROCEDURE create_portfolio_item(
  p_user_id UUID,
  p_title VARCHAR,
  p_description TEXT DEFAULT NULL,
  p_project_url VARCHAR DEFAULT NULL,
  p_image_url VARCHAR DEFAULT NULL,
  p_start_date DATE DEFAULT NULL,
  p_end_date DATE DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO portfolios (
    portfolio_id, user_id, title, description, project_url, image_url, start_date, end_date
  ) VALUES (
    uuid_generate_v4(), p_user_id, p_title, p_description, p_project_url, p_image_url, p_start_date, p_end_date
  );
  
  COMMIT;
END;
$$;

-- ==================== JOB MANAGEMENT ====================

-- Create job posting
CREATE OR REPLACE PROCEDURE create_job_posting(
  p_company_id UUID,
  p_title VARCHAR,
  p_description TEXT,
  p_location VARCHAR DEFAULT NULL,
  p_job_type VARCHAR DEFAULT 'full-time',
  p_salary_range VARCHAR DEFAULT NULL,
  p_expiry_date DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days')
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_job_id UUID;
BEGIN
  -- Insert job post
  INSERT INTO jobs (
    job_id, company_id, title, description, location, job_type, salary_range, status, created_at, expiry_date
  ) VALUES (
    uuid_generate_v4(), p_company_id, p_title, p_description, p_location, p_job_type, p_salary_range, 'active', NOW(), p_expiry_date
  ) RETURNING job_id INTO v_job_id;
  
  COMMIT;
END;
$$;

-- Add required skill to job
CREATE OR REPLACE PROCEDURE add_job_skill(
  p_job_id UUID,
  p_skill_id UUID,
  p_importance_level INTEGER DEFAULT 1
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO jobskills (
    job_skill_id, job_id, skill_id, importance_level
  ) VALUES (
    uuid_generate_v4(), p_job_id, p_skill_id, p_importance_level
  );
  
  COMMIT;
END;
$$;

-- ==================== APPLICATION MANAGEMENT ====================

-- Submit job application
CREATE OR REPLACE PROCEDURE submit_application(
  p_job_id UUID,
  p_user_id UUID
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_matching_score DECIMAL(5,2);
BEGIN
  -- Calculate matching score using skills
  SELECT COALESCE(
    (SELECT AVG(us.proficiency_level * js.importance_level) * 20
     FROM userskills us
     JOIN jobskills js ON us.skill_id = js.skill_id
     WHERE us.user_id = p_user_id AND js.job_id = p_job_id), 
    0) INTO v_matching_score;
  
  -- Insert application with calculated matching score
  INSERT INTO applications (
    application_id, job_id, user_id, status, matching_score, submitted_at, last_updated
  ) VALUES (
    uuid_generate_v4(), p_job_id, p_user_id, 'pending', v_matching_score, NOW(), NOW()
  );
  
  COMMIT;
END;
$$;

-- Update application status
CREATE OR REPLACE PROCEDURE update_application_status(
  p_application_id UUID,
  p_status VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
  UPDATE applications
  SET 
    status = p_status,
    last_updated = NOW()
  WHERE application_id = p_application_id;
  
  COMMIT;
END;
$$;

-- ==================== INTERVIEW MANAGEMENT ====================

-- Schedule interview
CREATE OR REPLACE PROCEDURE schedule_interview(
  p_application_id UUID,
  p_scheduled_time TIMESTAMP,
  p_location VARCHAR DEFAULT 'Virtual',
  p_notes TEXT DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Create interview record
  INSERT INTO interviews (
    interview_id, application_id, scheduled_time, location, status, notes
  ) VALUES (
    uuid_generate_v4(), p_application_id, p_scheduled_time, p_location, 'scheduled', p_notes
  );
  
  -- Update application status
  UPDATE applications
  SET 
    status = 'interview',
    last_updated = NOW()
  WHERE application_id = p_application_id;
  
  COMMIT;
END;
$$;

-- ==================== CV MANAGEMENT ====================

-- Store CV information
CREATE OR REPLACE PROCEDURE store_cv(
  p_user_id UUID,
  p_file_url VARCHAR,
  p_parsed_data JSONB DEFAULT NULL
)
LANGUAGE plpgsql
AS $$
BEGIN
  -- Check if CV already exists for this user
  IF EXISTS (SELECT 1 FROM cvs WHERE user_id = p_user_id) THEN
    -- Update existing CV
    UPDATE cvs
    SET 
      file_url = p_file_url,
      uploaded_at = NOW(),
      parsed_data = COALESCE(p_parsed_data, parsed_data)
    WHERE user_id = p_user_id;
  ELSE
    -- Create new CV record
    INSERT INTO cvs (
      cv_id, user_id, file_url, uploaded_at, parsed_data
    ) VALUES (
      uuid_generate_v4(), p_user_id, p_file_url, NOW(), p_parsed_data
    );
  END IF;
  
  COMMIT;
END;
$$;

-- ==================== AI MATCHING FUNCTIONS ====================

-- Get matching jobs for a user
CREATE OR REPLACE FUNCTION get_matching_jobs(p_user_id UUID, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  job_id UUID,
  company_name VARCHAR,
  job_title VARCHAR,
  matching_score DECIMAL(5,2)
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH user_skills AS (
    SELECT skill_id, proficiency_level
    FROM userskills
    WHERE user_id = p_user_id
  ),
  job_matches AS (
    SELECT 
      j.job_id,
      ep.company_name,
      j.title AS job_title,
      (SELECT COALESCE(AVG(us.proficiency_level * js.importance_level) * 20, 0)
       FROM user_skills us
       JOIN jobskills js ON us.skill_id = js.skill_id
       WHERE js.job_id = j.job_id) AS matching_score
    FROM jobs j
    JOIN employerprofiles ep ON j.company_id = ep.user_id
    WHERE j.status = 'active' AND j.expiry_date >= CURRENT_DATE
  )
  SELECT 
    jm.job_id, jm.company_name, jm.job_title, jm.matching_score
  FROM job_matches jm
  ORDER BY jm.matching_score DESC
  LIMIT p_limit;
END;
$$;

-- Get matching candidates for a job
CREATE OR REPLACE FUNCTION get_matching_candidates(p_job_id UUID, p_limit INTEGER DEFAULT 10)
RETURNS TABLE (
  user_id UUID,
  candidate_name VARCHAR,
  matching_score DECIMAL(5,2)
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH job_skills AS (
    SELECT skill_id, importance_level
    FROM jobskills
    WHERE job_id = p_job_id
  ),
  candidate_matches AS (
    SELECT 
      jsp.user_id,
      jsp.first_name || ' ' || jsp.last_name AS candidate_name,
      (SELECT COALESCE(AVG(us.proficiency_level * js.importance_level) * 20, 0)
       FROM userskills us
       JOIN job_skills js ON us.skill_id = js.skill_id
       WHERE us.user_id = jsp.user_id) AS matching_score
    FROM jobseekerprofiles jsp
    JOIN users u ON jsp.user_id = u.user_id
    WHERE u.account_status = 'active'
  )
  SELECT 
    cm.user_id, cm.candidate_name, cm.matching_score
  FROM candidate_matches cm
  WHERE cm.matching_score > 0
  ORDER BY cm.matching_score DESC
  LIMIT p_limit;
END;
$$;

-- Get skill recommendations for a user
CREATE OR REPLACE FUNCTION get_skill_recommendations(p_user_id UUID, p_limit INTEGER DEFAULT 5)
RETURNS TABLE (
  skill_id UUID,
  skill_name VARCHAR,
  relevance_score DECIMAL(5,2)
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  WITH user_skills AS (
    SELECT skill_id
    FROM userskills
    WHERE user_id = p_user_id
  ),
  job_skill_demand AS (
    SELECT 
      js.skill_id,
      s.name AS skill_name,
      COUNT(*) AS demand_count
    FROM jobskills js
    JOIN skills s ON js.skill_id = s.skill_id
    JOIN jobs j ON js.job_id = j.job_id
    WHERE j.status = 'active' AND j.expiry_date >= CURRENT_DATE
    GROUP BY js.skill_id, s.name
  )
  SELECT 
    jsd.skill_id,
    jsd.skill_name,
    (jsd.demand_count * 1.0 / (SELECT MAX(demand_count) FROM job_skill_demand)) * 100 AS relevance_score
  FROM job_skill_demand jsd
  WHERE jsd.skill_id NOT IN (SELECT skill_id FROM user_skills)
  ORDER BY relevance_score DESC
  LIMIT p_limit;
END;
$$;