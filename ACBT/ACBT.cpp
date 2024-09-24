#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <iterator>
#include <map>

using namespace std;

vector<string> readFromFile(string filename){
    ifstream file(filename);

    if (!file.is_open())
    {
        cerr << "Error opening file: " << filename << endl;
    };

    vector<vector<string>> dataArray;
    string line;
    vector<string> row;
    vector<string>::iterator i;

    while (getline(file, line))
    {
        stringstream ss(line);
        string token;

        while (getline(ss, token, ','))
        {
            row.push_back(token);
        }
    }
    dataArray.push_back(row);

    file.close();

    // for (const auto& row : dataArray) {
    //     for (const auto& col : row) {
    //         cout << col << "\t";
    //     }
    //     cout << endl;
    // }

    return row;
}


int userData(int a){
    vector<string> row = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ACBT\\StudentData.csv");
    
    vector<string> matricNo;
    for (int i = 7; i <= 140;)
    {
        matricNo.push_back(row[i]);
        i = i + 7;
    }
    vector<string> firstName;
    for (int i = 8; i <= 140;)
    {
        firstName.push_back(row[i]);
        i = i + 7;
    }
    vector<string> lastName;
    for (int i = 9; i <= 140;)
    {
        lastName.push_back(row[i]);
        i = i + 7;
    }
    vector<string> email;
    for (int i = 10; i <= 140;)
    {
        email.push_back(row[i]);
        i = i + 7;
    }
    vector<string> password;
    for (int i = 11; i <= 140;)
    {
        password.push_back(row[i]);
        i = i + 7;
    }
    vector<string> dob;
    for (int i = 12; i <= 140;)
    {
        dob.push_back(row[i]);
        i = i + 7;
    }
    vector<string> phoneNo;
    for (int i = 13; i <= 140;)
    {
        phoneNo.push_back(row[i]);
        i = i + 7;
    };

    //user details
    cout << "\n\nHELLO " << lastName[a]<< " " << firstName[a]<<",\n\n";
    cout << "Matric No.: " << matricNo[a]<<"\n";
    cout << "Date of Birth(yyyy-mm-dd):"<<dob[a]<<"\t\t";
    cout << "Telephone: "<<phoneNo[a]<<endl<<endl;
    return 0;
}

int takeQuizandcalculateScore(){
    vector<string> row1 = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ACBT\\QuestionBank.csv");
    vector<string> answer;
    string choice;
    vector<string> questions;
    for (int i = 3; i <= 85;)
    {
        questions.push_back(row1[i]);
        i = i + 2;
    }
    for (int i = 0; i < 10; i++)
    {
        cout << i+1 << ".) " << questions[i] <<endl;
        string skipQuestion;
        loop5:
        cout << "Enter N to skip question or Q to input an answer:";
        cin >> skipQuestion;
        if ((skipQuestion == "N") || (skipQuestion == "n")){
            answer.push_back("-");
            continue;
        } else if ((skipQuestion == "Q") || (skipQuestion == "q")){
            cout << "Answer: ";
            loop:
            cin >> choice;
            if ((choice == "A") || (choice == "B") || (choice == "C") || (choice == "D") || (choice == "E") || (choice == "a") || (choice == "b") || (choice == "c") || (choice == "d") || (choice == "e")){
                answer.push_back(choice);
            } else{
                cout << "Invalid option. Enter answer:";
                goto loop;
            }    
        } else{
            cout << "Invalid option.\n";
            goto loop5;
        }
    }
    string unansweredQuestions;
    string submitTest;
    loop6:
    cout << "Enter P, to go back to unanswered questions\n   Or R, to review all questions\n   Or S, to submit\n";
    cin >> unansweredQuestions;
    if ((unansweredQuestions == "P") || (unansweredQuestions == "p")){
        for (int i = 0; i < 10; i++){
            if (answer[i] == "-"){
                cout << i+1 << ".) " << questions[i] <<endl;
                string skipQuestion;
                loop12:
                cout << "Enter N to skip question or Q to input an answer:";
                cin >> skipQuestion;
                if ((skipQuestion == "N") || (skipQuestion == "n")){
                    answer.push_back("-");
                    continue;
                } else if ((skipQuestion == "Q") || (skipQuestion == "q")){
                    cout << "Answer: ";
                    loop10:
                    cin >> choice;
                    if ((choice == "A") || (choice == "B") || (choice == "C") || (choice == "D") || (choice == "E") || (choice == "a") || (choice == "b") || (choice == "c") || (choice == "d") || (choice == "e")){
                        answer[i] = choice;
                        continue;
                    } else{
                        cout << "Invalid option. Enter Answer:";
                        goto loop10;
                    }    
                } else{
                    cout << "Invalid option.\n";
                    goto loop12;
                }
            }
        }
        loop11:
        cout << "Enter S to submit\n   Or R to review:";
        cin >> submitTest;
        if ((submitTest == "S") || (submitTest == "s")){
            goto submit;
        } else if ((submitTest == "R") || (submitTest == "r")){
            goto review;
        } else{
            cout << "Invalid option.\n";
            goto loop11;
        }
    } else if ((unansweredQuestions == "R") || (unansweredQuestions == "r")){
        review:
        for (int i = 0; i < 10; i++){
            string changeAnswer;
            cout << i+1 << ".) " << questions[i] << "\nSelected Answer: " << answer[i];
            loop7:
            cout <<"\nWould you like to change your selected answer?" <<
             "\nEnter Y, if yes\n   Or N, if no:"<<endl;
            cin >> changeAnswer;
            if ((changeAnswer == "Y") || (changeAnswer == "y")){
                string newChoice;
                cout << "Enter Answer: ";
                loop8:
                cin >> newChoice;
                if ((newChoice == "A") || (newChoice == "B") || (newChoice == "C") || (newChoice == "D") || (newChoice == "E") || (newChoice == "a") || (newChoice == "b") || (newChoice == "c") || (newChoice == "d") || (newChoice == "e")){
                    answer[i] = newChoice;
                    continue;
                } else{
                    cout << "Invalid option. Enter Answer:";
                    goto loop8;
                }
            } else if ((changeAnswer == "N") || (changeAnswer == "n")){
                continue;
            } else {
                cout << "Invalid Input."<<endl;
                goto loop7;
            }
        }
        loop9:
        cout << "Enter S to submit\n   Or R to review:";
        cin >> submitTest;
        if ((submitTest == "S") || (submitTest == "s")){
            goto submit;
        } else if ((submitTest == "R") || (submitTest == "r")){
            goto review;
        } else{
            cout << "Invalid option.\n";
            goto loop9;
        }
        
    } else if ((unansweredQuestions == "S") || (unansweredQuestions == "s")){
        goto submit;
    } else{
        cout << "Invalid option.\n";
        goto loop6;
    }

    submit:
    vector<string> answerKey;
    for (int i = 2; i <= 85;)
    {
        answerKey.push_back(row1[i]);
        i = i + 2;
    }
    int answerChecker;
    int answerKeyChecker;
    int checker = 0;
    for (int i = 0; i < 10; i++){
        if(answerKey[i] == "A"){
            answerKeyChecker = 1;
        }
        if(answerKey[i] == "B"){
            answerKeyChecker = 2;
        }
        if(answerKey[i] == "C"){
            answerKeyChecker = 3;
        }
        if(answerKey[i] == "D"){
            answerKeyChecker = 4;
        }
        if(answerKey[i] == "E"){
            answerKeyChecker = 5;
        }
        if((answer[i] == "A") || (answer[i] == "a")){
            answerChecker = 1;
        }
        if((answer[i] == "B") || (answer[i] == "b")){
            answerChecker = 2;
        }
        if((answer[i] == "C") || (answer[i] == "c")){
            answerChecker = 3;
        }
        if((answer[i] == "D") || (answer[i] == "d")){
            answerChecker = 4;
        }
        if((answer[i] == "E") || (answer[i] == "e")){
            answerChecker = 5;
        }
        if((answer[i] == "-") || (answer[i] == "-")){
            answerChecker = 6;
        }
        if (answerKeyChecker == answerChecker){
            checker = checker + 1;
        }
    }
    int score = checker;
    cout << "TOTAL SCORE: " << score << "/10" <<endl;
    loop4:
    string scriptReview;
    cout << "Would you like to review your test script?\nEnter y for yes\n      n for no\n";
    cin >> scriptReview;
    if ((scriptReview == "Y") || (scriptReview == "y")){
        for(int i = 0; i < 10; i++){
            cout << i+1 << ".) " << questions[i] << "\nCorrect Answer: " << answerKey[i] <<
            "\nYour Answer: " << answer[i] <<endl;
        }
        cout << "TOTAL SCORE: " << score << "/10" <<endl;
        cout << "Thank you for using Student CBT!"<<endl;
    } else if ((scriptReview == "N") || (scriptReview == "n")){
        cout << "Thank you for using Student CBT!"<<endl;
    } else {
        cout << "Invalid Input."<<endl;
        goto loop4;
    }   
    
    return score;
};

int rules(){
    cout << "RULES OF THE QUIZ!"<<endl;
    cout << "1. Please ensure your carefully read all instructions before making any selection."<<
    "\n2. Both capital and small letter inputs are valid."<< 
    "\n3. Do not start until told to do so by the invigilator."<<
    "\n4. If you do not know the answer to a question, you will be provided with option to skip it."
    "\n5. After going through all the questions, you will be allowed to go back to previously skipped questions."<< 
    "\n6. You will be allowed to look through your answers again before submitting." <<
    "\n7. After submitting you cannot change your answers." <<
    "\n8. Your test scores will be displayed upon submission." <<
    "\n9. You will have the option to view your test script after submission." <<
    "\n\nGOOD LUCK!                                      BONNE CHANCE!"<<endl;
    string start;
    loop2:
    cout << "Enter S to start quiz:";
    cin >> start;
    if ((start == "S")||(start == "s")){
        takeQuizandcalculateScore();
    } else{
        cout << "Invalid Input!"<<endl;
        loop3:
        string yesOrNo;
        cout << "Would you like to read the rules again?\nIf yes, enter Y\nIf no, enter N" <<endl;
        cin >> yesOrNo;
        if ((yesOrNo == "Y") || (yesOrNo == "y")){
            rules();
        } else if ((yesOrNo == "N") || (yesOrNo == "n")){
            goto loop2;
        } else {
            cout << "Invalid Input."<<endl;
            goto loop3;
        }
        
    }
    return 0;
}

int loginUser(){
    vector<string> row = readFromFile("C:\\Users\\chizi\\OneDrive\\Documents\\Repositories\\projects\\ACBT\\StudentData.csv"); 
    vector<string> email;
    for (int i = 10; i <= 140;)
    {
        email.push_back(row[i]);
        i = i + 7;
    }
    vector<string> password;
    for (int i = 11; i <= 140;)
    {
        password.push_back(row[i]);
        i = i + 7;
    }
    ;map<string, string> userAuth;
    for (int i = 0; i < 19; i++)
    {   //creating a map of user email and password from the vectors...
        userAuth.insert(pair<string, string>(email[i], password[i]));
    }
    map<string, string>::iterator itr;
    loop1:
    string userEmail, userPassword;
    cout << "Please follow the prompt to login.\nEnter email (eg: johndoe@mail.com): ";
    cin >> userEmail;
    cout << "Enter password: ";
    cin >> userPassword;
    int n=0;
    for(itr=userAuth.begin(); itr != userAuth.end(); ++itr){
        userAuth.find(userEmail); //authenticating user...
        if((itr -> first == userEmail) && (itr -> second == userPassword)){
            // User's Access Granted
            for (int i = 0; i < 19; i++)
            {
                if(userEmail == email[i]){
                    int a = i;
                    userData(a); //displaying user details after login...
                }
            }
            n = n+1;
            rules();
        }
    }
    if(n < 1){
        cout << "\nInvalid Login Details! Please try again"<<endl;
        goto loop1;
    }
    
    return 0;
};

int main()
{
    cout << "\t\t\tOpening STUDENT ACBT...\n\n"<<endl;
    // takeQuizandcalculateScore();
    loginUser();
    

    return 0;
}
