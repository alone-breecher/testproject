// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NodeJob {
    struct Job {
        address owner;
        string title;
        string description;
        uint256 token;
        uint256 deadline;
        bool deleted;
    }
    
    struct Application {
        address freelancer;
        string email;
        string coverLetter;
        uint256 workToken;
    }

    mapping(uint256 => Job) public jobs;
    mapping(uint256 => Application[]) public jobApplications;
    uint256 public numberOfJobs = 0;

    function postJob(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _token,
        uint256 _deadline
    ) public returns (uint256) {
        Job storage job = jobs[numberOfJobs];

        require(bytes(_title).length > 0, "Title is required");
        require(bytes(_description).length > 0, "Description is required");
        require(_token > 0, "Token amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        job.owner = _owner;
        job.title = _title;
        job.description = _description;
        job.token = _token;
        job.deadline = _deadline;
        job.deleted = false;

        numberOfJobs++;
        return numberOfJobs - 1;
    }

    function getJobs() public view returns (Job[] memory) {
        Job[] memory allJobs = new Job[](numberOfJobs);

        uint256 index = 0;
        for (uint256 i = 1; i < numberOfJobs; i++) {
            Job storage job = jobs[i];
            if (!job.deleted) {
                allJobs[index] = job;
                index++;
            }
        }

        return allJobs;
    }

    function deleteJob(uint256 _id) public {
        require(jobs[_id].owner == msg.sender, "Only job owner can delete the job");
        require(!jobs[_id].deleted, "Job has already been deleted");

        jobs[_id].deleted = true;
    }

    function applyToJob(uint256 _id, string memory _email, string memory _coverLetter, uint256 _workToken) public {
        Job storage job = jobs[_id];

        require(bytes(_email).length > 0, "Email is required");
        require(bytes(_coverLetter).length > 0, "Cover letter is required");
        require(_workToken > 0, "Work token amount must be greater than 0");
        require(block.timestamp < job.deadline, "Deadline has already passed");
        require(job.owner != msg.sender, "Job owner cannot apply for their own job");
        
        Application memory newApplication = Application({
            freelancer: msg.sender,
            email: _email,
            coverLetter: _coverLetter,
            workToken: _workToken
        });
        
        jobApplications[_id].push(newApplication);
    }
    
    function getApplications(uint256 _id) public view returns (Application[] memory) {
        Job storage job = jobs[_id];
        require(job.owner == msg.sender, "Only job owner can view applications");
        
        return jobApplications[_id];
    }
}
