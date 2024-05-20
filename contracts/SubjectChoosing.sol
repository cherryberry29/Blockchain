// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SubjectChoosing {
    mapping(address => string) public studentSubjects;
    mapping(address => string) public studentUSNs;

    event SubjectChosen(address student, string subject, string usn);

    function chooseSubject(string memory _subject, string memory _usn) public {
        studentSubjects[msg.sender] = _subject;
        studentUSNs[msg.sender] = _usn;
        emit SubjectChosen(msg.sender, _subject, _usn);
    }

    // Optional: Function to get both subject and USN for a student
    function getStudentInfo(address student) public view returns (string memory subject, string memory usn) {
        return (studentSubjects[student], studentUSNs[student]);
    }
}
