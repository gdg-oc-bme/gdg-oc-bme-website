package hu.bme.mit.smartmobility.gdgbmewebsite.Model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(
		name = "users",
		indexes = {
				@Index(name = "idx_users_google_sub", columnList = "google_sub", unique = true),
				@Index(name = "idx_users_email",      columnList = "email",      unique = true)
		}
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends  BaseEntity{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "google_sub",nullable = false,unique = true,length = 255)
	private String googleSub;

	@Column(nullable = false, unique = true, length = 320)
	private String email;

	@Column(name = "full_name", nullable = false, length = 255)
	private String fullName;

	@Column(name = "avatar_url",length = 1024)
	private String avatarUrl;

	/** RBAC **/
	@Enumerated(EnumType.STRING)
	@Column(nullable = false,length = 20)
	@Builder.Default
	private Role role = Role.VISITOR;

	/** Gamification LeaderBoard points **/
	@Column(nullable = false)
	@Builder.Default
	private Integer points = 0;

	//OPTIONAL, Can be removed from the code. Just in case.
	/** Whether the user banned/soft deleted from the platform
	  **/
	@Column(nullable = false)
	@Builder.Default
	private Boolean active = true;

	public boolean isAdmin(){
		return Role.ADMIN.equals(this.role);
	}

	public boolean isMember(){
		return Role.MEMBER.equals(this.role) || isAdmin();
	}

	public void addPoints(int points){
		if(points > 0) this.points += points;
	}
}
