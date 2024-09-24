#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <iterator>
#include <map>

using namespace std;

vector<string> readFromFile(string filename){ 
    ifstream file(filename);

    if (!file.is_open()){
        cerr << "Error opening file: " << filename << endl;
    }

    vector<vector<string>> dataArray;
    string line;
    vector<string> row;
    vector<string>::iterator i;

    while (getline(file, line)){
        stringstream ss(line);
        string token;

        while (getline(ss, token, '-')){
            row.push_back(token);
        }
    }
    dataArray.push_back(row);

    file.close();

    return row;
}

int updateStudentRecord(){ 
    vector<string> studentRecords = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ResultManager\\studentRecord.txt"); 
    map<string, string> studentDetails;
    int size1 = studentRecords.size();

    for (int i = 23; i < size1;){
        studentDetails.insert(pair<string, string>(studentRecords[i], studentRecords[i+2]));
        i = i + 23; 
    }

    vector<string> studentCourses;
    vector<string> courseScores;
    vector<vector<string>> studentScores;
    int size3 = studentCourses.size();

    for (int i = 4; i < 23;){
        studentCourses.push_back(studentRecords[i]);
        i = i+2;
    }

    int x, y=27, z=27;
    size3 = studentCourses.size();

    for (x = 0; x < size3; x++){
        courseScores.clear();
        while(y < size1){
            courseScores.push_back(studentRecords[y]);
            y = y+23;
        }
        studentScores.push_back(courseScores);
        z = z + 2;
        y = z; 
    }

    string matno, courseScore;
    map<string, string>::iterator itr;
    cout<<"Please enter student's Matric No: ";
    cin >> matno;
    try{
        int n=0;
        for(itr=studentDetails.begin(); itr != studentDetails.end(); ++itr){
            studentDetails.find(matno); //authenticating matric no...
            if(itr -> first == matno){
                int index = distance(studentDetails.begin(),studentDetails.find(matno));
                cout<<"\nName\t\t"<<studentDetails[matno]<<endl;
                cout<<"Matric No\t"<<matno<<"\n"<<endl;
                int x = 0;
                int position = ((index + 1) * 23) + 4;
                for (vector<string> s: studentScores){
                    cout<<studentCourses[x]<<": ";
                    cout<<s.at(index)<<endl;
                    cout<<"Please enter updated "<<studentCourses[x]<<" score: ";
                    cin >> courseScore;
                    int courseScore1 = stof(courseScore);
            loop1:  try{
                        if (courseScore1 <= 100){
                            studentRecords.at(position) = courseScore;
                        }else{
                            throw courseScore1;
                            goto loop1;
                        }  
                    } catch (int a){
                        cout <<"Invalid Input. Score above maximum!\n";
                    }
                    cout<<"New "<<studentCourses[x]<<": "<<studentRecords.at(position)<<endl;
                    x++;
                    position = position + 2;
                }
                n = n+1; 
            }
        }
        if(n == 1){
            ofstream MyFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ResultManager\\studentRecord.txt"); 
            for (int b = 0; b < size1; b++) {
                if (((b % 23) == 0 ) && (b != 0)){
                    MyFile<<endl;
                }
                MyFile<<studentRecords[b]<<"-";
            }
            MyFile.close();
            cout <<"Records of Matric No '"<<matno<<"' Successfully Updated!";
        } 
        if(n < 1){
            throw 0;
        }  
    } catch (int i){
        cout <<"Could not find Matric No '"<<matno<<"'!";
    }
    
    return 0;
}

int viewAllRecords(){ 
    vector<string> studentRecords = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ResultManager\\studentRecord.txt"); 
    
    int size1 = studentRecords.size();
    for (int i = 0; i < size1; i++){
       if ((i != 0) && (i%23 == 0)){
            cout<<endl;
        }
        cout<<studentRecords[i];
       
    }
    
    return 0;
}

int saveStudentRecord(){ 
    vector<string> studentRecords = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ResultManager\\studentRecord.txt"); 

    map<string, string> studentDetails;
    int size1 = studentRecords.size();

    for (int i = 23; i < size1;){
        studentDetails.insert(pair<string, string>(studentRecords[i], studentRecords[i+2]));
        i = i + 23; 
    }

    vector<string> studentCourses;
    vector<string> courseScores;
    vector<vector<string>> studentScores;
    int size3 = studentCourses.size();

    for (int i = 4; i < 23;){
        studentCourses.push_back(studentRecords[i]);
        i = i+2;
    }

    int x, y=27, z=27;
    size3 = studentCourses.size();

    for (x = 0; x < size3; x++){
        courseScores.clear();
        while(y < size1){
            courseScores.push_back(studentRecords[y]);
            y = y+23;
        }
        studentScores.push_back(courseScores);
        z = z + 2;
        y = z; 
    }

    string matno;
    map<string, string>::iterator itr;
    cout<<"Please enter student's Matric No: ";
    cin >> matno;
    try{
        int n=0;
        for(itr=studentDetails.begin(); itr != studentDetails.end(); ++itr){
            studentDetails.find(matno); //authenticating matric no...
            if(itr -> first == matno){
                ofstream MyFile(matno + ".txt");
                int index = distance(studentDetails.begin(),studentDetails.find(matno));
                MyFile<<"\nName\t\t"<<studentDetails[matno]<<endl;
                MyFile<<"Matric No\t"<<matno<<endl;
                cout<<"\nName\t\t"<<studentDetails[matno]<<endl;
                cout<<"Matric No\t"<<matno<<endl;
                int x = 0;
                for (vector<string> s: studentScores){
                    MyFile<<studentCourses[x]<<": ";
                    MyFile<<s.at(index)<<endl;
                    cout<<studentCourses[x]<<": ";
                    cout<<s.at(index)<<endl;
                    x++;
                }
                n = n+1;
                MyFile.close();
            }
        }
        if(n == 1){
            cout<<"\nFile Successfully saved to '"<< matno <<".txt'";
        }else if(n < 1){
            throw 0;
        }  
    } catch (int i){
        cout <<"Could not find Matric No '"<<matno<<"'!";
    }
    
    return 0;
}

int searchStudentRecord(){ 
    vector<string> studentRecords = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\My Work\\C++\\school\\resultManager\\studentRecord.txt"); 
    map<string, string> studentDetails;
    int size1 = studentRecords.size();

    for (int i = 23; i < size1;){
        studentDetails.insert(pair<string, string>(studentRecords[i], studentRecords[i+2]));
        i = i + 23; 
    }

    vector<string> studentCourses;
    vector<string> courseScores;
    vector<vector<string>> studentScores;
    int size3 = studentCourses.size();

    for (int i = 4; i < 23;){
        studentCourses.push_back(studentRecords[i]);
        i = i+2;
    }

    int x, y=27, z=27;
    size3 = studentCourses.size();

    for (x = 0; x < size3; x++){
        courseScores.clear();
        while(y < size1){
            courseScores.push_back(studentRecords[y]);
            y = y+23;
        }
        studentScores.push_back(courseScores);
        z = z + 2;
        y = z; 
    }

    string matno;
    map<string, string>::iterator itr;
    cout<<"Please enter student's Matric No: ";
    cin >> matno;
    try{
        int n=0;
        for(itr=studentDetails.begin(); itr != studentDetails.end(); ++itr){
            studentDetails.find(matno); //authenticating matric no...
            if(itr -> first == matno){
                int index = distance(studentDetails.begin(),studentDetails.find(matno));
                cout<<"\nName\t\t"<<studentDetails[matno]<<endl;
                cout<<"Matric No\t"<<matno<<endl;
                int x = 0;
                for (vector<string> s: studentScores){
                    cout<<studentCourses[x]<<": ";
                    cout<<s.at(index)<<endl;
                    x++;
                }
                n = n+1;
            }
        }
        if(n < 1){
            throw 0;
        }  
    } catch (int i){
        cout <<"Could not find Matric No '"<<matno<<"'!";
    }
     
    return 0;
}

int quitProgram(){
    cout << "\n\nThank you for using Student Result Management System!";
    
    return 0;
}

int mainMenu(){ 
    string menuSelector;
    cout << "\n               MAIN MENU               \nEnter 'U' to UPDATE student's result.\nEnter 'V' to VIEW all results.\nEnter 'S' to SAVE a student's score to file.\nEnter 'T' to SEARCH for a student's result.\nEnter 'Q' to QUIT the program.\nKey: ";
    cin >> menuSelector;
    try{
        if ((menuSelector == "u") || (menuSelector == "U")){
            updateStudentRecord();
            mainMenu();
        } else if ((menuSelector == "v") || (menuSelector == "V")){
            viewAllRecords();
            mainMenu();
        }else if ((menuSelector == "s") || (menuSelector == "S")){
            saveStudentRecord();
            mainMenu();
        }else if ((menuSelector == "t") || (menuSelector == "T")){
            searchStudentRecord();
            mainMenu();
        }else if ((menuSelector == "q") || (menuSelector == "Q")){
            quitProgram();
        }else{
            throw menuSelector;
        }    
    }
    catch(const string St) {
        cout <<"Invalid Input";
        mainMenu();
    }

    return 0;
}

int grantAccess(){ 
    vector<string> accessGranted = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ResultManager\\accessGranted.txt"); 
    vector<string> email;
    int size = accessGranted.size();
    for (int i = 7; i < size;){
       email.push_back(accessGranted[i]);
       i = i + 5;
    }
    
    vector<string> password;
    for (int i = 9; i < size;){
       password.push_back(accessGranted[i]);
       i = i + 5;
    }
    
    int size1 = email.size();
    string userEmail, userPassword;
    cout << "Enter Login Details\n";
    cout << "Email: ";
    cin >> userEmail;
    cout << "Password: ";
    cin >> userPassword;
    map<string, string> userAuth;
    for (int i = 0; i < size1; i++)
    {   //creating a map of user email and password from the vectors...
        userAuth.insert(pair<string, string>(email[i], password[i]));
    }
    map<string, string>::iterator itr;
    int n=0;
    for(itr=userAuth.begin(); itr != userAuth.end(); ++itr){
        userAuth.find(userEmail); //authenticating user...
        if((itr -> first == userEmail) && (itr -> second == userPassword)){
            cout << "\nAccess Granted!\n"<<endl;
            mainMenu();
            n = n+1;
        }
    }
    if(n < 1){
        cout << "\nInvalid Login Details! Please try again"<<endl;
        grantAccess();
    }

    return 0;
}

int main(){ 
    // vector studentRecord = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\My Work\\C++\\school\\resultManager\\studentRecord.txt");
    cout << "WELCOME TO STUDENT RESULT MANAGEMENT SYSTEM!\n";
    grantAccess();
    // viewAllRecords();
    // searchStudentRecord();
    // updateStudentRecord();

    return 0;
}